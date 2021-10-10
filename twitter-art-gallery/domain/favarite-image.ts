
export class FavoriteImage {
  public readonly id: number
  public readonly url: string
  public readonly source: string
  public readonly height: number
  public readonly width: number

  public constructor(props: { id: number, url: string, source: string, height: number, width: number}) {
    const { id, url, source, height, width} = props;
    this.id = id;
    this.url = url;
    this.source = source;
    this.height = height;
    this.width = width;
  }
}
