import { createInvitation } from '../data-services';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const { categoryId, ownerId } = req.body;

      try {
         const token = await createInvitation(categoryId, ownerId);
         const invitationLink = `${process.env.BASE_URL}/invite?token=${token}`;
         res.status(200).json({ invitationLink });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   } else {
      res.status(405).json({ error: 'Method not allowed' });
   }
}
