import React from "react"

import { Video } from "./style"

const VideoBackground = React.forwardRef((props, ref) => (
  <Video ref={ref} {...props} />
))

export default VideoBackground