export function DateTimeInput({ name, label, description }) {
    return (
      <div className="sm:col-span-3">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-white">
          {label}
        </label>
        <div className="mt-2">
          <input
            type="datetime-local"
            name={name}
            id={name}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder={description}
          />
        </div>
      </div>
    );
  }
  