import React, { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useFetchGuestlistsQuery } from "../services/api"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import SlideOver from "./SlidOver";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const GuestlistsPage = () => {
  const {
    data: guestlists,
    error,
    isLoading,
    refetch,
  } = useFetchGuestlistsQuery();

  const [creatingGuestlist, setCreatingGuestlist] = useState(false);

  useEffect(() => {
    // Refetch guestlists when the component mounts or updates
    refetch();
  }, [refetch, creatingGuestlist]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching guestlists: {error.toString()}</div>;
  return (
    
      <>
        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Guestlists
          </h3>
          <div className="mt-3 sm:ml-4 sm:mt-0">
            <button
              onClick={() => setCreatingGuestlist(true)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new guestlist
            </button>
          </div>
        </div>
        {/* Show message if there are no guestlists */}
        {!guestlists?.length ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No guestlists found. Start by creating a new one.
            </p>
            <Link
              to="/new-guestlist"
              className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Create your first guestlist
            </Link>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {guestlists.map((guestlist) => (
              <Link
                as="li"
                to={`/guestlists/${guestlist._id}`}
                key={guestlist._id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {guestlist.title}
                    </p>
                    {/* <p
                className={classNames(
                  statuses[project.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {project.status}
              </p> */}
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                      Created{" "}
                      <time dateTime={guestlist.createdAt}>
                        {guestlist.createdAt}
                      </time>
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="truncate">
                      Created by {guestlist.user.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Link
                    to={`/guestlists/${guestlist._id}`}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  >
                    View guestlist
                    <span className="sr-only">, {guestlist.title}</span>
                  </Link>
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">Open options</span>
                      <HiEllipsisVertical className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {guestlist.title}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Move<span className="sr-only">, {guestlist.title}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Delete<span className="sr-only">, {guestlist.title}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </Link>
            ))}
          </ul>
        )}
        <SlideOver visible={creatingGuestlist} hide={() => setCreatingGuestlist(false)}/>
      </>

  );
};

export default GuestlistsPage;
