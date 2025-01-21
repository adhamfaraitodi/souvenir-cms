import classNames from "classnames";

const Title = ({ children, level = "h1", customClass }) => {
    const HeadingTag = level;
    return (
        <HeadingTag
            className={classNames(
                customClass,
                "text-2xl text-black sm:text-3xl md:text-4xl",
            )}
        >
            {children}
        </HeadingTag>
    );
};

export default Title;
