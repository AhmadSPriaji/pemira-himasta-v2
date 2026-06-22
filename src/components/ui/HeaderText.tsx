import Image from "next/image"

type HeaderTextProps = React.ComponentPropsWithoutRef<"div"> & {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

export default function HeaderText({ text, as: Tag = "h2", ...rest }: HeaderTextProps) {
  return (
    <div {...rest}>
      <div className="flex h-full w-full items-center justify-center gap-4 lg:gap-6 2xl:gap-8 ">
        <Image
          className="h-6 w-auto 2xl:h-10"
          alt=""
          src="/ui/star-fill.svg"
          width={500}
          height={500}
        />
        <Tag className="text-center font-head text-3xl text-yellow lg:text-5xl 2xl:text-[64px]">
          {text}
        </Tag>
        <Image
          className="z-0 h-6 w-auto rotate-180 2xl:h-10"
          alt=""
          src="/ui/star-fill.svg"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
