export default function Testimonials() {
  return (
    <div className="bg-white pb-16 pt-24 sm:pb-24 sm:pt-36 xl:pb-32">
      <div className="bg-black pb-20 sm:pb-24 xl:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
          <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
            <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
              <img
                className="absolute inset-0 h-full w-full rounded-2xl bg-black object-cover shadow-2xl"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
            <figure className="relative isolate pt-6 sm:pt-12">
              <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                <p>
                  Meo Romano's cuisine is a masterpiece of flavors and elegance.
                  From the first bite, I was transported to a world of culinary
                  delight. Each dish is a work of art, meticulously crafted with
                  the finest ingredients and a passion for perfection
                </p>
              </blockquote>
              <figcaption className="mt-8 text-base">
                <div className="font-semibold text-white">Judith Black</div>
                <div className="mt-1 text-gray-400">Wow Magazine</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
