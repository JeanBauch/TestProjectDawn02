import React, { Component } from 'react';
import { Container ,Content } from '../uploadStyles';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import Upload from '../Upload'
import FileList from '../FileList'

import api from '../../../services/api'
//import fileSize from 'filesize';
//import { MdUpdate } from 'react-icons/md';

let uploaded = false;

class Final extends Component {

    state = {
        uploadedFiles: [],
    };

    /*
    async componentDidMount() {
        const response = await api.get('/projects/img');

        this.setState({
            uploadedFiles: response.data.map(file => ({
                id: file.key,
                name: file.name,
                readableSize: fileSize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url,
            }))
        })
    }*/

    handleUpload = files => {
        
        const uploadedFiles = files.map(file =>({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));
        
        this.setState ({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        });

        uploadedFiles.forEach(this.processUpload);
    };

    updateFile = (id, data) => {
        this.setState({ 
            uploadedFiles: this.state.uploadedFiles.map(uploadedFiles => {
            return id === uploadedFiles.id 
                ? { ...uploadedFiles, ...data } 
                : uploadedFiles;
            }) 
        });
    };

    processUpload = uploadedFiles => {
        const data = new FormData();
        const projectID = localStorage.getItem('ProjectID');

        data.append('file', uploadedFiles.file, uploadedFiles.name);

        api.post('/projects/img', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded*100) / e.total));

                this.updateFile(uploadedFiles.id, {
                    progress,
                });
            },
            headers: {
                ProjectID: projectID,
            },

        }).then(async response => {
            this.updateFile(uploadedFiles.id, {
                uploaded: true,
                id: response.data.key,
                url: response.data.url,
            });
            const urlimg = response.data.url;

            if(!uploaded) {
                await api.post(`/projects/${projectID}`, null, {
                    headers: {
                        urlimg,
                    },
                });
                uploaded = true;
            }
        }).catch(() => {
            this.updateFile(uploadedFiles.id, {
                error: true,
            });
        });
    };

    handleDelete = async id => {
        await api.delete(`/projects/img/${id}`);

        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
        })
    }

    componentWillUnmount() {
        this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
        uploaded = false;
    }

    render() {
        const { uploadedFiles } = this.state;
        return (
            <Container>
                <Content>
                    <Upload onUpload={this.handleUpload}/>
                    { !!uploadedFiles.length && ( 
                        <FileList files={uploadedFiles} onDelete={this.handleDelete}/> 
                    )}
                </Content>
            </Container>
        )
    }
}

export default Final;