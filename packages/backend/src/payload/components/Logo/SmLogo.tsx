import React from 'react'

const SMLogo = ({width}: { width: number }) => {
  return (
    <div style={{
      width: `${width}px`,
      display: 'flex'
    }}>
      <style>
        {
          `
          .logo-path-fill {
            fill: var(--theme-elevation-1000);
          }
          `
        }
      </style>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 24">
        <g clipPath="url(#a)">
          <path
            d="m25.48 2.141-.042-.022c-.82-.444-1.905-.111-2.397.767l-4.666 8.345a.444.444 0 0 1-.598.17.43.43 0 0 1-.174-.588l1.22-2.182c.492-.879.226-1.954-.594-2.397-.824-.446-1.89-.09-2.38.788l-1.294 2.313a.444.444 0 0 1-.598.17.43.43 0 0 1-.174-.587l1.65-2.949c.49-.878.238-1.933-.582-2.377l-.044-.023c-.8-.433-1.84-.123-2.314.726l-1.857 3.32a.444.444 0 0 1-.598.171.43.43 0 0 1-.173-.587l1.804-3.226.015-.031.045-.077.265-.384c.492-.878.215-1.962-.605-2.405-.82-.443-1.895-.097-2.387.78L5.956 7.192a.433.433 0 0 1-.593.161.427.427 0 0 1-.213-.253.418.418 0 0 1 .035-.327L7.42 2.789l-3.775.955c-1.17.202-1.727 1.908-1.727 1.908s-2.57 7.54-1.304 11.195c1.121 3.236 3.62 3.89 5.924 4.966 5.13 2.395 8.313 1.116 11.238-3.074 2.204-3.155 6.774-11.46 8.305-14.211.487-.878.215-1.944-.603-2.387Z"
            fill="#FAFF00"/>
          <path
            d="M34.297 7.923c0 .82.522 1.444 1.565 1.87.176.08.546.23 1.107.45.578.221 1.044.41 1.397.568 2.135.932 3.202 2.455 3.202 4.57 0 1.547-.505 2.786-1.517 3.718-1.01.915-2.335 1.373-3.972 1.373-.851 0-1.605-.103-2.264-.308-.642-.22-1.163-.497-1.565-.829a4.583 4.583 0 0 1-.963-1.23c-.24-.49-.401-.972-.481-1.445a6.936 6.936 0 0 1-.073-1.54h3.179c-.016.727.144 1.327.481 1.8.353.474.915.71 1.686.71.61 0 1.1-.165 1.468-.497.386-.331.578-.797.578-1.397 0-.915-.594-1.618-1.782-2.107l-1.3-.52c-.69-.285-1.22-.53-1.589-.735-1.653-.852-2.48-2.28-2.48-4.286 0-1.357.466-2.462 1.397-3.315.93-.868 2.167-1.302 3.708-1.302 1.765 0 3.05.458 3.852 1.373.803.9 1.172 2.076 1.108 3.529h-3.082c0-.616-.169-1.113-.506-1.492-.321-.395-.778-.592-1.372-.592-.562 0-1.004.158-1.325.473-.305.3-.457.687-.457 1.16Zm13.268 3.267c-.642.695-.963 1.579-.963 2.652 0 1.074.329 1.957.987 2.652.658.679 1.5 1.018 2.528 1.018 1.043 0 1.886-.34 2.528-1.018.642-.694.963-1.578.963-2.652 0-1.057-.329-1.934-.987-2.628-.658-.71-1.501-1.066-2.528-1.066-1.044 0-1.886.348-2.528 1.042Zm-2.336 7.364c-1.236-1.231-1.854-2.794-1.854-4.688 0-1.894.634-3.465 1.902-4.712 1.284-1.247 2.89-1.87 4.816-1.87 2.006 0 3.627.615 4.863 1.846 1.252 1.231 1.878 2.794 1.878 4.688 0 1.879-.634 3.442-1.902 4.689-1.252 1.247-2.865 1.87-4.84 1.87-1.99 0-3.61-.607-4.863-1.823ZM62.172 7.496v7.956c0 1.342.554 2.013 1.661 2.013.562 0 .995-.182 1.3-.545.321-.379.482-.876.482-1.491V7.496h3.226v12.668H65.64v-.947c-.578.726-1.477 1.09-2.697 1.09-1.364 0-2.375-.403-3.033-1.208-.642-.805-.963-1.895-.963-3.268V7.496h3.226Zm12.551-4.64v17.308h-3.226V2.856h3.226Zm12.567 9.329v7.98h-3.227v-7.98c0-.616-.152-1.105-.457-1.468-.29-.363-.706-.545-1.252-.545-.562 0-.995.182-1.3.545-.305.363-.458.868-.458 1.515v7.932H77.37V7.496h3.226v.948c.61-.727 1.533-1.09 2.769-1.09 1.38 0 2.4.458 3.058 1.374.802-.916 1.878-1.374 3.227-1.374 1.492 0 2.583.41 3.274 1.232.706.82 1.059 1.894 1.059 3.22v8.358h-3.226v-7.98c0-.63-.153-1.12-.458-1.467-.288-.363-.714-.545-1.276-.545-.561 0-.995.19-1.3.568-.289.363-.433.845-.433 1.445Zm8.851 3.835c0-1.2.41-2.194 1.228-2.983.819-.79 1.886-1.184 3.202-1.184.979 0 1.742.174 2.288.521v-.64c0-1.246-.562-1.87-1.686-1.87-.545 0-.947.142-1.204.426-.24.285-.36.632-.36 1.042h-3.01c.032-1.231.433-2.202 1.204-2.912.77-.71 1.894-1.066 3.37-1.066 1.75 0 2.994.427 3.732 1.279.754.837 1.132 2.02 1.132 3.552v7.98h-2.697v-.806c-.61.647-1.517.971-2.72.971-1.3 0-2.376-.395-3.227-1.184-.835-.79-1.252-1.831-1.252-3.126Zm3.034-.023c0 .537.177.979.53 1.326.353.331.802.497 1.348.497.529 0 .971-.166 1.324-.497.353-.348.53-.79.53-1.326 0-.537-.177-.97-.53-1.302-.353-.332-.803-.498-1.348-.498-.546 0-.996.174-1.349.521-.336.332-.505.758-.505 1.279Zm13.001-10.49v1.99h1.975v2.675h-1.975v5.896c0 .473.089.82.265 1.042.193.205.514.308.963.308h.747v2.699l-.217.047a4.42 4.42 0 0 1-.65.071c-.273.032-.57.048-.891.048-2.295 0-3.443-1.105-3.443-3.315v-6.796h-1.204V7.496h1.204V5.507h3.226Zm15.967 9.353h-9.197c.08.837.401 1.5.963 1.99.578.473 1.324.71 2.239.71 1.348 0 2.432-.632 3.25-1.895l2.384 1.421c-.449.931-1.148 1.713-2.095 2.344-.931.632-2.111.947-3.539.947-1.974 0-3.572-.584-4.791-1.752-1.204-1.184-1.806-2.77-1.806-4.76 0-1.91.586-3.48 1.757-4.711 1.188-1.247 2.713-1.87 4.575-1.87 1.927 0 3.459.568 4.599 1.704 1.14 1.137 1.709 2.66 1.709 4.57 0 .505-.016.94-.048 1.302Zm-6.284-4.901c-.803 0-1.461.237-1.974.71-.498.458-.787 1.058-.867 1.8h5.826c-.08-.742-.385-1.342-.914-1.8-.53-.473-1.22-.71-2.071-.71Z"
            className="logo-path-fill"/>
        </g>
        <defs>
          <clipPath id="a">
            <path className="logo-path-fill" d="M0 0h128v24H0z"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default SMLogo