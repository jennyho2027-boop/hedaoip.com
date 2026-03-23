export const metadata = {
  title: "合道 · 个人IP知识库采集",
  description: "AI+IP 个人品牌数字外脑 · 内容营销系统",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "linear-gradient(165deg, #F5F0E8 0%, #EDE6DA 50%, #E8DFD0 100%)", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
