
export class User {
  public readonly id: number
  public readonly name: string
  public readonly image: string
  public readonly favourites_count: number

  public constructor(props: { id: number, name: string, image: string, favourites_count: number }) {
    const { id, name, image, favourites_count} = props;
    this.id = id;
    this.name = name;
    this.image = image;
    this.favourites_count = favourites_count;
  }
}
