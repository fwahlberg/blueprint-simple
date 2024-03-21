import React from 'react';
import { Popover } from '@headlessui/react';
import { HiQuestionMarkCircle } from "react-icons/hi";

function PlusOnesControl({ value, onChange }) {
  const options = Array.from({ length: 11 }, (_, i) => i); // Assuming a maximum of 10 plus ones

  return (
    <div className="my-4 relative">
      <label htmlFor="plusOnes" className="block text-sm font-medium text-gray-700 flex flex-row">
        Plus Ones
        <Popover className="relative inline-flex">
          {({ open }) => (
            <>
              <Popover.Button className={`ml-2 ${open ? '' : 'text-opacity-80'} focus:outline-none`}>
                <HiQuestionMarkCircle className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white p-4">
                    <p className="text-sm text-gray-500">
                      Indicate how many additional people you're bringing along. 
                      Note that the event organizer will be notified of your total party size.
                    </p>
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </label>
      <select
        id="plusOnes"
        className="mt-1 block w-full pl-3 pr-10 py-2 border text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlusOnesControl;
