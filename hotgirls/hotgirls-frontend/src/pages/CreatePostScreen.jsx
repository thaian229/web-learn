import React from 'react';

// style={{color: 'transparent'}} 

class CreatePostScreen extends React.Component {
    state = {
        imageFile: undefined,
        imageSource: '',
        content: '',
        errMessage: '',
    };


    handleImageChange = (event) => {
        // console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        // Change image file to base64 url 
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = (data) => { // call back of fileReader
                this.setState({
                    imageFile: imageFile,
                    imageSource: data.currentTarget.result,
                });
            };
        } else {
            this.setState({
                imageFile: undefined,
                imageSource: '',
            });
        }
    };

    handleContentChange = (event) => {
        this.setState({
            content: event.target.value,
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.imageFile || !this.state.content) {
            this.setState({
                errMessage: 'Please select an image and write content',
            });
        } else {
            this.setState({
                errMessage: '',
            });

            // Upload file and take local path from database
            const formData = new FormData();
            formData.append('image', this.state.imageFile);
            fetch(`http://localhost:3001/uploads/image`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    // Don't need, create error. Remove and fetch, express, multer auto detech it.
                },
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    this.setState({
                        errMessage: error.message,
                    });
                });
            // Create Post => database
        }
    };

    render() {
        return (
            <div className="row mt-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <form onSubmit={this.handleFormSubmit} >
                        <div className="form-group">
                            <label htmlFor='file' className="btn">Select Image</label>
                            <input
                                id='file'
                                type='file'
                                accept="image/*"
                                className='form-control'
                                style={{
                                    color: `transparent`,
                                    margin: `0 auto`,
                                    textIndent: `-999em`,
                                }}
                                onChange={this.handleImageChange}
                            />
                            {this.state.imageSource ? (
                                <div style={{ textAlign: `center`, }}>
                                    <img
                                        src={this.state.imageSource}
                                        alt='preview image'
                                        style={{
                                            height: `400px`,
                                            width: `auto`,
                                        }}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input content"
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            >
                            </textarea>
                        </div>
                        {this.state.errMessage ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.errMessage}
                            </div>
                        ) : null}
                        <div className="form-group">
                            <input type='submit' className='btn btn-primary' value='Create Post' />
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        );
    }
}

export default CreatePostScreen;