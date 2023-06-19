type Props = {
    req: any,
    res: any
}

export default function preview({req, res}: Props) {
  res.setPreviewData({})
  res.writeHead(307, {Location: '/'})
  res.end()
}