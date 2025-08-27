import { fontFaces } from '@/styles/fonts';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    ${fontFaces}

    :root {
        font-size: 18px;

        @media (width <= 427.98px) {
        font-size: 17px;
        }

        @media (width <= 399.98px) {
        font-size: 16px;
        }

        @media (width <= 320px) {
        font-size: 12px;
        }
    }

    html, body {
        overscroll-behavior: none contain;
        user-select: none;
        -webkit-user-select: none;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: ${(props) => props.theme.colors.grayScale.white};
        font-family: SUIT, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    html {
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
    
    #root {
        width: 100vw;
        height: 100%;
        background-color: ${(props) => props.theme.colors.grayScale.white};
        position: fixed;
    }

    * {
        box-sizing: border-box;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    *::-webkit-scrollbar {
        display: none;
    }
`;
