import React from "react"

function SvgComponent(props: any) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="#000" d="M0 0h24v24H0z" />
      <path
        d="M18.926 8.17l-1.144-1.097A.255.255 0 0017.6 7a.244.244 0 00-.182.073l-7.932 7.453-2.887-2.693a.266.266 0 00-.364 0l-1.157 1.08a.23.23 0 000 .345l3.64 3.396c.235.219.52.346.761.346.345 0 .644-.236.755-.334h.006l8.693-8.15c.09-.103.09-.255-.007-.346z"
        fill="#fff"
      />
    </svg>
  )
}

export default SvgComponent