import React from 'react'


function Services({title,icon,desc}) {
  return (
    <>
      <div className="rounded-2xl shadow-[0_4px_12px_#d0d0d1] hover:shadow-[0_6px_16px_#d0d0d1] transition p-6 text-center">
        {" "}
              <i className='text-green-600'>{ icon}</i>
              <h4 className="mt-4 font-semibold text-xl">{title}</h4>
        <p className="text-gray-600 mt-2">
          {desc}
        </p>
      </div>
    </>
  );
}

export default Services