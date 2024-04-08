import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='py-6 pt-24 z-[-99]'>
      <div>
          {/* Hero card */}
          <div className="relative z-[-99]">
            <div className="absolute z-[-99] inset-x-0 bottom-0 h-1/2 bg-background" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative z-[-99] shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute z-[-99] inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://thumbs.dreamstime.com/b/ngo-contribution-corporate-foundation-nonprofit-concept-business-people-meeting-78548981.jpg"
                    alt="People working on laptops"
                  />
                  <div className="absolute z-[1] inset-0 dark:bg-blue-950/80 bg-primary/50 mix-blend-multiply" />
                </div>
                <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-foreground/90">Take Ease in your</span>
                    <span className="block text-background/70">Donation Accepting</span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-100 sm:max-w-3xl">
                  Join us in making a difference – every donation brings us one step closer to creating positive change and empowering communities
                  </p>
                  <div className="mt-10 z-[9]max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <Link
                        to="/explore"
                        className="flex pointer items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-foreground bg-background/70 hover:bg-indigo-50 sm:px-8"
                      >
                        Get started
                      </Link>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary/70 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                      >
                        Live demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="bg-background z-[1]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                Trusted by over 5 very average small businesses
              </p>
              <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img className="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                    alt="StaticKit"
                  />
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                    alt="Transistor"
                  />
                </div>
                <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                    alt="Workcation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
