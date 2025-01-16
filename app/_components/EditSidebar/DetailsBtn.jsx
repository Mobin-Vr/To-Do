export default function DetailsBtn({ children, text }) {
   return (
      <button className='p-3 flex gap-4 hover:bg-accent-50 w-full'>
         <span>{children}</span>
         <span>{text}</span>
      </button>
   );
}
