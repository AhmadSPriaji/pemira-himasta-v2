export const votingContent = [
  {
    id: 1,
    title: "Login",
  },
  {
    id: 2,
    title: "Vote",
  },
  {
    id: 3,
    title: "Success",
  },
]

type StepProps = {
  items?: {
    id: number
    title: string
  }[]
  onStep: number
}

const StepProgressBar = (props: StepProps) => {
  return (
    <section className="relative mb-12 flex justify-center text-white md:mb-10 2xl:mb-28">
      <div className="absolute top-3 mx-auto h-2 w-[50%] rounded-md bg-red md:top-[14px] md:w-[30%] lg:w-[35%] 2xl:top-5 2xl:w-1/4">
        <div
          className={`absolute -ml-3 h-2 w-1/2 rounded-md bg-yellow ${
            props.onStep >= 2 ? "" : "hidden"
          }`}
        ></div>
        <div
          className={`absolute right-0 -ml-3 h-2 w-1/2 rounded-md bg-yellow ${
            props.onStep == 3 ? "" : "hidden"
          }`}
        ></div>
      </div>
      <div className="flex w-[60%] justify-between md:w-[40%] 2xl:w-[30%]">
        {(Array.isArray(props.items) ? props.items : votingContent).map((content) => (
          <div
            key={content.id}
            className="relative flex flex-col items-center justify-center"
          >
            <div
              className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full p-3 text-xl md:h-9 md:w-9 md:p-4 md:text-2xl 2xl:h-10 2xl:w-10 2xl:p-6 2xl:text-[32px] ${
                content.id <= props.onStep
                  ? "bg-yellow text-red"
                  : "bg-red text-yellow"
              } `}
            >
              {content.id}
            </div>
            <p className="text-lg text-white md:text-xl 2xl:text-2xl">
              {content.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StepProgressBar
