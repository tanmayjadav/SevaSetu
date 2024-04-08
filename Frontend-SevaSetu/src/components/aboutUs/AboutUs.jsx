/* This example requires Tailwind CSS v2.0+ */
import logoImage from "../../assets/Logo.png";


const stats = [
    { label: 'Founded', value: '2023' },
    { label: 'Clients Served', value: '30+' },
    { label: 'Campaigns Launched', value: '50+' },
    { label: 'Donations Raised', value: '$100K+' },
  ];
  
  export default function AboutUs() {
    return (
      <div className="py-10 sm:py-20">
        <div className="lg:mx-auto lg:max-w-7xl  lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
              <div className="absolute z-[-1] inset-y-0 right-1/2 w-full rounded-r-3xl lg:right-72" />
              <svg
                className="absolute top-8 z-[-1] left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
              </svg>
            </div>
            <div className="relative z-[-1] mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
              {/* Testimonial card*/}
              <div className="relative z-[-1] pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                <img
                  className="absolute z-[-1]  inset-0 h-full w-full object-cover"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="absolute z-[-1] inset-0 bg-primary/10 dark:bg-primary/60  mix-blend-multiply" />
                <div className="absolute z-[-1] inset-0 bg-gradient-to-t from-primary/70 dark:from-gray-900 via-primary/40 dark:via-gray-500 opacity-90" />
                <div className="relative px-8">
                  <div>
                    <img
                      className="h-12"
                      src={logoImage}
                      alt="SevaSetu"
                    />
                  </div>
                  <blockquote className="mt-4">
                    <div className="relative z-[-1] text-lg font-medium text-white/80 dark:text-foreground md:flex-grow">
                      <svg
                        className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative">
                        Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium in volutpat, diam.
                        Montes, magna cursus nulla feugiat dignissim id lobortis amet.
                      </p>
                    </div>
  
                    <footer className="mt-4">
                      <p className="text-base font-semibold text-foreground/70">Sarah Williams, CEO at SevaSetu</p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
  
          <div className="relative z-[-1] mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
            {/* Content area */}
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl text-foreground/90 font-extrabold tracking-tight sm:text-4xl">
                Empowering NGOs and Organizations
              </h2>
              <div className="mt-6 text-foreground/70 space-y-6">
                <p className="text-lg">
                  Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
                  pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel
                  porttitor vitae ut. Amet vitae fames senectus vitae.
                </p>
                <p className="text-base leading-7">
                  Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                  velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                  egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                </p>
              </div>
            </div>
  
            {/* Stats section */}
            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                    <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-foreground/80">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <a href="#" className="text-base font-medium text-primary">
                  {' '}
                  Learn more about our services <span aria-hidden="true">&rarr;</span>{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  