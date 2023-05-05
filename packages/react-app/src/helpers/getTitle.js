const getTitle = (plan) => {
    let title;
    switch (plan) {
        case 0:
            title = "DSDC(S)"
            break;

        case 1:
            title = "MUTANTS"
            break;

        case 2:
            title = "STONERS"
            break;

        default:
            break;
    }

    return title
}
export default getTitle;