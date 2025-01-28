import classNames from "classnames";

const Title = ({ children, level = "h1", className }) => {
    const HeadingTag = level;
    return (
        <HeadingTag
            className={classNames(
                className,
                "text-2xl text-black sm:text-3xl md:text-4xl",
            )}
        >
            {children}
        </HeadingTag>
    );
};

export default Title;
