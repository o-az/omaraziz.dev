import clsx from 'clsx'

export function Image({ src, alt, style, caption }: { src: string; alt: string; style?: string; caption?: string }) {
  return (
    <figure class="text-center mx-auto w-full !mt-8 !mb-2">
      <img src={src} alt={alt} class={clsx(style, 'text-center mx-auto hover:(cursor-pointer) !my-0')} />
      <figcaption class="!mt-2 subpixel-antialiased whitespace-normal !text-gray-400">{`${caption}`}</figcaption>
    </figure>
  )
}
