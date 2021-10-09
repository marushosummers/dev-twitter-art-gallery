import React from "react";
import axios from "axios";
import InputForm from "./InputForm";
import ImageList from './ImageList'

type typeImageTableState = {
    screen_name: string;
    images: typeImages;
    message: string;
};

type typeImages = {
    images: ImageItem[];
    max_id: string;
};

export type ImageItem = {
    url: string;
    source: string;
};

export interface ImageListProps {
    imageItems: ImageItem[];
}

class MainTable extends React.Component<{}, typeImageTableState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            images: {
                images: [],
                max_id: "",
            },
            message: "",
            screen_name: "",
        };
    }

    handleSubmit = (screen_name: string) => {
        if (screen_name !== this.state.screen_name) {
            this.setState({ images: { images:[], max_id: "" } })
        }
        this.setState({ screen_name: screen_name, message: "loading..." })
        setTimeout(() => {
            this.getiine(screen_name)
        }, 500)
    }

    getiine = (screen_name: string) => {
        twitterAPI(screen_name, this.state.images.max_id)
            .then((res: any) => {
                console.log(res.body)
                const result = this.packing(res.body)
                console.log(result)
                this.setIineImages(result)
            })
            .catch(() => {
                this.setState({
                    message: "取得に失敗しました。データが空か、スクリーンネームが間違っているかもしれません。",
                });
            });
    }

    setIineImages = (results: any) => {
        this.setState({
            images: {
                images: this.state.images.images.concat(results.images),
                max_id: String(results.max_id)
            }
        })
        if (results.url.length === 0) {
            this.setState({ message: "いいねした画像がありませんでした" });
            return;
        }
        this.setState({
            message: ""
        });
    };

    componentDidMount() {
            let queue: NodeJS.Timeout;
            window.addEventListener("scroll", () => {
                clearTimeout(queue);
                queue = setTimeout(() => {
                    const scroll_Y = document.documentElement.scrollTop + window.innerHeight;
                    const offsetHeight = document.documentElement.offsetHeight;
                    if (
                        offsetHeight - scroll_Y <= 1000 &&
                        this.state.message !== "loading..." &&
                        offsetHeight > 1500
                    ) {
                        this.setState({ message: "loading..." });
                        this.getiine(this.state.screen_name);
                    }
                }, 500);
            });
    }

    render() {
        return (
            <div>
                <InputForm screen_name={""} onSubmit={(screen_name: string) => this.handleSubmit(screen_name)} />
                <ImageList imageItems={this.state.images.images} />
                <div className="box h-64 text-center m-5 p-4 ...">
                    {this.state.message}
                </div>
            </div>
        );
    }
}
export default MainTable;

function twitterAPI(screen_name: string, max_id: string) {
    let endpoint = `http://${process.env.ENDPOINT}/api/twitter?name=${screen_name}&max_id=${max_id}`
    console.log(endpoint)
    return new Promise((resolve, reject) => {
        axios.get(endpoint)
            .then((res: any) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    });
}


const packing = async (data: any) => {
    let images = [];

    for (let i = 0; i < data.length; i++) {
        console.log(i)
        images.push({
            url: data.url[i],
            source: data.source[i],
            height: data.height[i]
        })
        console.log(images)
    }

    const result = {
        images: images,
        max_id: data.max_id
    }
    return result
}
