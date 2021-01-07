import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/site.webmanifest"/>
                    <meta name="msapplication-TileColor" content="#1F1F1F"/>
                    <meta name="theme-color" content="#1F1F1F"/>
                    <title>VectorDrawable to SVG</title>

                    <meta property="og:url"                content="https://vector-drawable.vercel.app/" />
                    <meta property="og:title"              content="Android VectorDrawable to SVG" />
                    <meta property="og:description"        content="Quickly create an SVG out of Android VectorDrawable." />
                    <meta property="og:image"              content="https://vector-drawable.vercel.app/thumbnail-cover.png" />

                    <meta name="twitter:card" content="Android VectorDrawable to SVG"/>

                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
                          rel="stylesheet"/>
                </Head>
                <body>
                <div className="container">
                    <Main/>
                </div>
                <NextScript/>
                </body>
            </Html>
        )
    }
}
