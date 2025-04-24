interface CategoryitemProps {
  title: string;
  href: string;
}

export default function CategoryItem({ title, href }: CategoryitemProps) {
  return (
    <li className="category-item">
      <img
        className="category-background"
        src="/img/background/category-background.webp"
        alt="Category background"
      />
      {href !== "#" ? (
        <a className="category-content" href={href} target="_blank" rel="noopener noreferrer" >
          <div className="category-body">
            <h4 className="category-title">{title}</h4>
            <span className="category-click">CLICK HERE</span>
          </div>
        </a>
      ) : (
        <div className="category-content">
          <div className="category-body">
            <h4 className="category-title">{title}</h4>
            <span className="category-click">CLICK HERE</span>
          </div>
        </div>
      )}
    </li>
  );
}
