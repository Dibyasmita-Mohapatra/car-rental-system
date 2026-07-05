import {
 FaCar,
 FaBolt,
 FaTruck
} from "react-icons/fa";

function Categories() {

 const data = [
   {
    icon:<FaCar />,
    name:"Luxury"
   },
   {
    icon:<FaBolt />,
    name:"Electric"
   },
   {
    icon:<FaTruck />,
    name:"SUV"
   }
 ];

 return (
  <section
   id="categories"
   className="py-24"
  >

   <div className="max-w-6xl mx-auto">

    <h2 className="text-5xl text-center font-bold mb-12">
      Browse Categories
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {data.map((item,index)=>(
       <div
        key={index}
        className="bg-slate-800 p-10 rounded-3xl hover:-translate-y-2 transition"
       >

        <div className="text-5xl text-amber-400">
          {item.icon}
        </div>

        <h3 className="text-2xl mt-6">
          {item.name}
        </h3>

       </div>
      ))}

    </div>

   </div>

  </section>
 );
}

export default Categories;