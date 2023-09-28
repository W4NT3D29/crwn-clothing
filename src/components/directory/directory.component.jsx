import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const categories = [
    {
      id: 1,
      title: "Tequila",
      imageUrl: "/images/tequila.jpg",
      route: 'shop/tequila'
    },
    {
      id: 2,
      title: "Ron",
      imageUrl: "/images/rum.jpg",
      route: 'shop/ron'
    },
    {
      id: 3,
      title: "Whiskey",
      imageUrl: "/images/whiskey.jpg",
      route: 'shop/whiskey'
    },
    {
      id: 4,
      title: "Vodka",
      imageUrl: "/images/vodka.jpg",
      route: 'shop/vodka'
    },
    {
      id: 5,
      title: "Gin",
      imageUrl: "/images/gin.jpg",
      route: 'shop/gin'
    },
  ];

const Directory = () => (
    <div className="directory-container">
        {categories.map((category) => (
            <DirectoryItem key={category.id} category={category} />
        ))}
    </div>
);

export default Directory;
