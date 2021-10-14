
export class User {
  public readonly id: number
  public readonly name: string
  public readonly image: string
  public readonly favourites_count: number
  public readonly protected: boolean

  public constructor(props: { id: number, name: string, image: string, favourites_count: number, protected: boolean }) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.favourites_count = props.favourites_count;
    this.protected = props.protected;
  }
}
