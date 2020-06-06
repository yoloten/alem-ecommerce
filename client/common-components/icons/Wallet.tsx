import React from "react";

function SvgWallet(props: any) {
  return (
    <svg width={22} height={22} {...props}>
      <path
        d="M18.827 5.5H3.173A3.316 3.316 0 000 8.938v9.625A3.316 3.316 0 003.173 22h15.654A3.316 3.316 0 0022 18.562V8.938A3.316 3.316 0 0018.827 5.5zM15.6.058L3.177 2.688A3.072 3.072 0 00.846 5.211a3.233 3.233 0 012.591-1.089h15.178V2.951A3.456 3.456 0 0017.88.797 2.378 2.378 0 0015.6.058z"
        fill="rgba(0,0,0,0.87)"
      />
    </svg>
  );
}

export default SvgWallet;
