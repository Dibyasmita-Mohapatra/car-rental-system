function Testimonials() {

 const reviews = [
  {
   name:"Rahul",
   text:"Amazing service and luxury cars."
  },
  {
   name:"Priya",
   text:"Very smooth booking process."
  },
  {
   name:"Ankit",
   text:"Best car rental experience."
  }
 ];

 return (
  <section
   id="testimonials"
   className="py-24 bg-slate-900"
  >

   <div className="max-w-6xl mx-auto">

    <h2 className="text-5xl font-bold text-center mb-12">
      Customer Reviews
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {reviews.map((review,index)=>(
        <div
         key={index}
         className="bg-slate-800 p-8 rounded-3xl"
        >

         <h3 className="text-amber-400 text-xl">
           ★★★★★
         </h3>

         <p className="my-5">
          {review.text}
         </p>

         <h4 className="font-bold">
          {review.name}
         </h4>

        </div>
      ))}

    </div>

   </div>

  </section>
 );
}

export default Testimonials;