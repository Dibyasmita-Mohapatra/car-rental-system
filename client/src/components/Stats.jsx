function Stats() {
  const stats = [
    {
      number:"5000+",
      title:"Cars"
    },
    {
      number:"120+",
      title:"Cities"
    },
    {
      number:"50K+",
      title:"Customers"
    },
    {
      number:"24/7",
      title:"Support"
    }
  ];

  return (
    <section className="py-16 bg-slate-900">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

        {stats.map((item,index)=>(
          <div
            key={index}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-amber-400">
              {item.number}
            </h2>

            <p className="mt-2 text-gray-400">
              {item.title}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Stats;