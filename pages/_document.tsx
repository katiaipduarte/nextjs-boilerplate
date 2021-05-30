
import { getLangFromReq } from '@utils/from-req';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// import { GTM_ID } from '../lib/gtm/gtm-helper';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const locale = getLangFromReq(ctx.req);
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        locale,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="keywords" content="" />
          <meta property="og:site_name" content="nextjs-boilerplate" />
          <meta property="og:locale" content={this.props.locale} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="" />
          <link rel="preconnect" href="https://static.ufurnish.com/assets" />
          <link rel="dns-prefetch" href="https://static.ufurnish.com/assets" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
          />
          {/* https://fonts.gstatic.com is the font file origin */}
          {/* It may not have the same origin as the CSS file (https://fonts.googleapis.com) */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          {/* We use the full link to the CSS file in the rest of the tags */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
            media="print"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
