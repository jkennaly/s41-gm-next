<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Faction Type Data</h3>
    </div>

    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          {...register('name', { required: true })}
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Description</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          {...register('description', { required: true })}
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="baseSize" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Base Size</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="number"
          {...register('baseSize', { required: true })}
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="basePower" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Base Power</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="number"
          {...register('basePower', { required: true })}
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="technologyLevel" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Technology Level</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          {...register('technologyLevel', { required: true })}
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  </div>

  <div className="pt-5">
    <div className="flex justify-end">
      <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
      <button onClick={handleCancel} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
    </div>
  </div>
</form>
