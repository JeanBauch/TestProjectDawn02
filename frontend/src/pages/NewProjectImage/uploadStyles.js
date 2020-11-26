import styled, { css } from 'styled-components'
import 'react-circular-progressbar/dist/styles.css';

const dragActive = css`
    border-color: #00E0FF;
`;

const dragReject = css`
    border-color: #e57878;
`;


export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Content = styled.div`
    width: 100%;
    min-width: 450px;
    margin: 6px;
    background: #DBDBDB;
    border-radius: 8px;
    border: 1px solid #000000;
    padding: 10px 10px;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    border: 1px dashed rgb(180, 180, 180);
    border-radius: 4px;
    cursor: pointer;

    transition: height 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`;

const messageColors = {
    default: '#333',
    error: '#e57878',
    success: '#00E0FF',
};

export const UploadMessage = styled.p`
    display: flex;
    opacity: 70%;
    color: ${props => messageColors[props.type || "default"]};
    justify-content: center;
    align-content: center;
    padding: 15px 0;
`;

export const ContainerFile = styled.ul`
    margin-top: 20px;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;

        & + li {
            margin-top: 15px;
        }
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 12px;
            color: #999;
            margin-top: 5px;

            button {
                font-size:14px;
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }
`

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`