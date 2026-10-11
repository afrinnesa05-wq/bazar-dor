export default function Loading() {
return ( <div className="min-h-screen animate-pulse bg-gray-50 p-8"> <div className="mx-auto max-w-7xl"> <div className="mb-8 h-8 w-48 rounded bg-gray-200" />


    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="rounded-xl border bg-white p-4"
        >
          <div className="h-36 rounded-lg bg-gray-200" />
          <div className="mt-4 h-5 w-32 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
          <div className="mt-6 h-7 w-36 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
</div>


);
}
