CREATE TABLE public.categories (
  category_owner_id bigint NULL,
  category_title text NOT NULL,
  category_created_at timestamp with time zone NULL DEFAULT now(),
  has_category_invitation boolean NOT NULL DEFAULT false,
  category_id uuid NOT NULL,
  has_category_collaborator boolean NOT NULL DEFAULT false,
  CONSTRAINT task_categories_pkey PRIMARY KEY (category_id)
);


CREATE TABLE public.collaborators (
  invitation_id uuid NOT NULL,
  user_id bigint NOT NULL,
  CONSTRAINT invitation_users_pkey PRIMARY KEY (invitation_id, user_id),
  CONSTRAINT invitation_users_invitation_id_fkey FOREIGN KEY (invitation_id) REFERENCES invitations(invitation_id) ON DELETE CASCADE,
  CONSTRAINT invitation_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE public.errors_log (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  method text NULL DEFAULT 'null'::text,
  message text NULL DEFAULT 'null'::text,
  CONSTRAINT errors_log_pkey PRIMARY KEY (id)
);


CREATE TABLE public.health_check (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  status text NULL DEFAULT 'ok'::text,
  last_updated timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT health_check_pkey PRIMARY KEY (id)
);


CREATE TABLE public.invitations (
  invitation_id uuid NOT NULL DEFAULT gen_random_uuid(),
  invitation_category_id uuid NOT NULL,
  invitation_owner_id bigint NOT NULL,
  invitation_created_at timestamp with time zone NULL DEFAULT now(),
  invitation_limit_access boolean NOT NULL DEFAULT false,
  CONSTRAINT invitations_pkey PRIMARY KEY (invitation_id),
  CONSTRAINT invitations_invitation_category_id_fkey FOREIGN KEY (invitation_category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  CONSTRAINT invitations_invitation_owner_id_fkey FOREIGN KEY (invitation_owner_id) REFERENCES users(user_id)
);


CREATE TABLE public.tasks (
  task_title text NOT NULL,
  task_note text NULL,
  is_task_starred boolean NULL DEFAULT false,
  task_due_date timestamp with time zone NULL,
  task_created_at timestamp with time zone NULL,
  task_updated_at timestamp with time zone NULL,
  is_task_completed boolean NULL DEFAULT false,
  task_id uuid NOT NULL,
  task_reminder timestamp with time zone NULL,
  task_repeat text NULL,
  task_completed_at timestamp with time zone NULL,
  is_task_in_myday boolean NULL DEFAULT false,
  task_steps jsonb NULL,
  task_owner_id bigint NOT NULL,
  task_category_id uuid NOT NULL,
  task_category_title text NULL,
  CONSTRAINT tasks_pkey PRIMARY KEY (task_id),
  CONSTRAINT tasks_task_category_id_fkey FOREIGN KEY (task_category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  CONSTRAINT tasks_task_owner_id_fkey FOREIGN KEY (task_owner_id) REFERENCES users(user_id)
);


CREATE TABLE public.users (
  user_id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  user_email text NOT NULL,
  user_fullname text NOT NULL,
  user_clerk_id text NULL,
  user_created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (user_id),
  CONSTRAINT users_clerk_id_key UNIQUE (user_clerk_id),
  CONSTRAINT users_email_key UNIQUE (user_email)
);

----------------
----- RPC ------
----------------

CREATE OR REPLACE FUNCTION public.invitation_create(param_category_id uuid, param_owner_id bigint)
RETURNS uuid AS $$
DECLARE
    v_category_exists BOOLEAN;
    v_invitation_id uuid;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM categories
        WHERE category_id = param_category_id
          AND category_owner_id = param_owner_id
    ) INTO v_category_exists;

    IF NOT v_category_exists THEN
        RAISE EXCEPTION 'Category not found or does not belong to the given owner.';
    END IF;

    v_invitation_id := gen_random_uuid();

    INSERT INTO invitations (
        invitation_id, 
        invitation_category_id, 
        invitation_owner_id, 
        invitation_created_at, 
        invitation_limit_access
    )
    VALUES (
        v_invitation_id, 
        param_category_id, 
        param_owner_id, 
        CURRENT_TIMESTAMP, 
        FALSE
    );

    UPDATE categories
    SET has_category_invitation = TRUE
    WHERE category_id = param_category_id;

    INSERT INTO collaborators (invitation_id, user_id)
    VALUES (v_invitation_id, param_owner_id)
    ON CONFLICT DO NOTHING;

    RETURN v_invitation_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Transaction failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.get_owner_invitations(param_user_id bigint)
RETURNS SETOF jsonb AS $$
DECLARE
    v_invitation_id UUID;
    v_invitation_category_id UUID;
    v_invitation_owner_id BIGINT;
    v_invitation_limit_access BOOLEAN;
    v_invitation_created_at TIMESTAMP WITH TIME ZONE;
    v_shared_with JSONB;
BEGIN
    FOR v_invitation_id, v_invitation_category_id, v_invitation_owner_id, v_invitation_limit_access, v_invitation_created_at 
    IN
        SELECT invitation_id, invitation_category_id, invitation_owner_id, invitation_limit_access, invitation_created_at
        FROM invitations
        WHERE invitation_owner_id = param_user_id
    LOOP
        SELECT jsonb_agg(
            jsonb_build_object(
                'user_id', u.user_id,
                'user_name', u.user_fullname,
                'user_email', u.user_email
            )
        )
        INTO v_shared_with
        FROM collaborators c
        JOIN users u ON c.user_id = u.user_id
        WHERE c.invitation_id = v_invitation_id;

        v_shared_with := COALESCE(v_shared_with, '[]'::JSONB);

        RETURN NEXT jsonb_build_object(
            'invitation_id', v_invitation_id,
            'invitation_category_id', v_invitation_category_id,
            'invitation_owner_id', v_invitation_owner_id,
            'invitation_limit_access', v_invitation_limit_access,
            'invitation_created_at', v_invitation_created_at,
            'sharedWith', v_shared_with
        );
    END LOOP;

    RETURN;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.get_joined_invitations(param_user_id bigint)
RETURNS SETOF jsonb AS $$
DECLARE
    v_invitation_id UUID;
    v_category_id UUID;
    v_category_owner_id bigint;
BEGIN
    FOR v_invitation_id, v_category_id, v_category_owner_id IN
        SELECT i.invitation_id, i.invitation_category_id, c.category_owner_id
        FROM invitations i
        JOIN collaborators col ON i.invitation_id = col.invitation_id
        JOIN categories c ON i.invitation_category_id = c.category_id
        WHERE col.user_id = param_user_id
          AND i.invitation_owner_id != param_user_id
    LOOP
        RETURN NEXT jsonb_build_object(
            'invitation_id', v_invitation_id,
            'invitation_category_id', v_category_id,
            'invitation_category_owner_id', v_category_owner_id
        );
    END LOOP;

    RETURN;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.get_relevent_categories(param_user_id bigint)
RETURNS SETOF categories AS $$
BEGIN
    RETURN QUERY
    (
        SELECT c.*
        FROM categories c
        WHERE c.category_owner_id = param_user_id

        UNION

        SELECT c.*
        FROM categories c
        JOIN invitations i ON c.category_id = i.invitation_category_id
        JOIN collaborators col ON i.invitation_id = col.invitation_id
        WHERE col.user_id = param_user_id
    );
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.invitation_leave(invitation_token uuid, user_id bigint)
RETURNS void AS $$
DECLARE
    category_id UUID;
BEGIN
    SELECT category_id 
    INTO category_id 
    FROM invitations 
    WHERE token = invitation_token;

    DELETE FROM collaborators
    WHERE invitation_id = invitation_token 
      AND user_id = user_id;

    IF NOT EXISTS (
        SELECT 1 
        FROM collaborators 
        WHERE invitation_id = invitation_token
    ) THEN
        UPDATE categories
        SET has_category_collaborator = FALSE
        WHERE category_id = category_id;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.get_relevent_tasks(param_user_id bigint)
RETURNS SETOF tasks AS $$
DECLARE
    v_category_id UUID;   
    v_invitation_id UUID; 
BEGIN
    CREATE TEMP TABLE temp_tasks (
        LIKE tasks INCLUDING ALL,
        CONSTRAINT unique_task_id UNIQUE (task_id)
    );

    INSERT INTO temp_tasks
    SELECT *
    FROM tasks
    WHERE task_owner_id = param_user_id;

    FOR v_invitation_id IN
        SELECT invitation_id
        FROM collaborators
        WHERE user_id = param_user_id
    LOOP
        SELECT invitation_category_id INTO v_category_id  
        FROM invitations
        WHERE invitation_id = v_invitation_id;

        IF v_category_id IS NOT NULL THEN
            INSERT INTO temp_tasks
            SELECT *
            FROM tasks
            WHERE task_category_id = v_category_id
            ON CONFLICT (task_id) DO NOTHING;
        END IF;
    END LOOP;

    RETURN QUERY
    SELECT DISTINCT *
    FROM temp_tasks;

    DROP TABLE temp_tasks;

    RETURN;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.invitation_set_limit(param_invitation_id uuid, param_invitation_owner_id bigint, param_limit_access boolean)
RETURNS void AS $$
DECLARE
    v_current_owner_id BIGINT;
BEGIN
    SELECT invitation_owner_id 
    INTO v_current_owner_id 
    FROM invitations 
    WHERE invitation_id = param_invitation_id;

    IF v_current_owner_id IS NULL THEN
        RAISE EXCEPTION 'Invitation with ID % not found or does not exist.', param_invitation_id;
    END IF;

    IF v_current_owner_id IS DISTINCT FROM param_invitation_owner_id THEN
        RAISE EXCEPTION 'Unauthorized action: Only the owner can modify access limits for invitation with ID %.', param_invitation_id;
    END IF;

    UPDATE invitations
    SET invitation_limit_access = param_limit_access
    WHERE invitation_id = param_invitation_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Transaction failed: %', SQLERRM;
        RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.invitation_remove_user(param_invitation_id uuid, param_user_id bigint, param_owner_id bigint)
RETURNS void AS $$
DECLARE
    v_invitation_category_id UUID;
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM invitations
        WHERE invitation_id = param_invitation_id
        AND invitation_owner_id = param_owner_id
    ) THEN
        RAISE EXCEPTION 'User is not the owner of the invitation!';
    END IF;

    DELETE FROM collaborators
    WHERE invitation_id = param_invitation_id
    AND user_id = param_user_id;

    IF NOT EXISTS (
        SELECT 1
        FROM collaborators
        WHERE invitation_id = param_invitation_id
    ) THEN
        SELECT invitation_category_id INTO v_invitation_category_id
        FROM invitations
        WHERE invitation_id = param_invitation_id;

        IF v_invitation_category_id IS NOT NULL THEN
            UPDATE categories
            SET has_category_collaborator = false
            WHERE category_id = v_invitation_category_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.invitation_stop_sharing(param_invitation_id uuid, param_invitation_owner_id bigint)
RETURNS void AS $$
DECLARE
    v_current_owner_id BIGINT;
    v_associated_category_id UUID;
BEGIN
    BEGIN
        SELECT invitation_owner_id, invitation_category_id
        INTO v_current_owner_id, v_associated_category_id
        FROM invitations
        WHERE invitation_id = param_invitation_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Invitation with ID % does not exist.', param_invitation_id;
        END IF;

        IF v_current_owner_id IS DISTINCT FROM param_invitation_owner_id THEN
            RAISE EXCEPTION 'Unauthorized action: Only the owner can revoke access to this invitation with ID %.', param_invitation_id;
        END IF;

        DELETE FROM invitations
        WHERE invitation_id = param_invitation_id;

        UPDATE categories
        SET has_category_invitation = false,
            has_category_collaborator = false
        WHERE category_id = v_associated_category_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Failed to update category with ID %', v_associated_category_id;
        END IF;

    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'Transaction failed: %', SQLERRM;
            RETURN;
    END;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.invitation_join(param_invitation_id uuid, param_user_id bigint)
RETURNS jsonb AS $$
DECLARE
    v_associated_category_id UUID;  
    v_is_access_limited BOOLEAN;  
BEGIN
    SELECT invitation_category_id, invitation_limit_access 
    INTO v_associated_category_id, v_is_access_limited
    FROM invitations 
    WHERE invitation_id = param_invitation_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invitation not found.';
    END IF;

    IF v_is_access_limited THEN
        RAISE EXCEPTION 'Access is limited for this invitation.';
    END IF;

    IF v_associated_category_id IS NULL THEN
        RAISE EXCEPTION 'Invitation does not have a valid category.';
    END IF;

    IF EXISTS (
        SELECT 1 
        FROM collaborators 
        WHERE invitation_id = param_invitation_id 
          AND user_id = param_user_id
    ) THEN
        RETURN jsonb_build_object(
            'category', 
            (SELECT to_jsonb(cat) 
             FROM categories cat 
             WHERE cat.category_id = v_associated_category_id),
            'tasks', 
            COALESCE(
                (SELECT jsonb_agg(to_jsonb(task)) 
                 FROM tasks task 
                 WHERE task.task_category_id = v_associated_category_id),
                '[]'::jsonb
            )  
        );
    END IF;

    INSERT INTO collaborators (invitation_id, user_id)
    VALUES (param_invitation_id, param_user_id);

    UPDATE categories
    SET has_category_collaborator = true
    WHERE category_id = v_associated_category_id;

    RETURN jsonb_build_object(
        'category', 
        (SELECT to_jsonb(cat) 
         FROM categories cat 
         WHERE cat.category_id = v_associated_category_id),
        'tasks', 
        COALESCE(
            (SELECT jsonb_agg(to_jsonb(task)) 
             FROM tasks task 
             WHERE task.task_category_id = v_associated_category_id),
            '[]'::jsonb
        )  
    );
END;
$$ LANGUAGE plpgsql;