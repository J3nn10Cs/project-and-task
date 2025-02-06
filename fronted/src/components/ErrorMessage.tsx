import React from "react";

export default function ErrorMessage({children} : {children : React.ReactNode}) {
  return (
    <>
    <div className="bg-red-200 font-black text-center p-2 mt-2 rounded-2xl text-red-600">
      {children}
    </div>
    </>
  )
}
