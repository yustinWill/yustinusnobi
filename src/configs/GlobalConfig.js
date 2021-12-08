import { Dimensions, Platform } from "react-native"

export const Fonts = Object.freeze({
    CIRCULAR_STD_BOLD: 'CircularStd-Bold',
    CIRCULAR_STD_BOOK: 'CircularStd-Book',
    CIRCULAR_STD_BOOK_ITALIC: 'CircularStd-BookItalic'
})

export const Metrics = Object.freeze({
    SAFE_AREA: 24,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    NAVBAR_HEIGHT: 56
})

export const StorageKey = Object.freeze({
    USER_TOKEN: 'user_token',
})

const relativeImagePath = '../assets/images/'

export const Icons = Object.freeze({
    TAB_MENU_LOGO: require(`${relativeImagePath}icons/tabMenu/ic_tab_nobi.png`),
    TAB_MENU_LOGO_WHITE: require(`${relativeImagePath}icons/tabMenu/ic_tab_nobi_white.png`),
    TAB_MENU_GRAPH: require(`${relativeImagePath}icons/tabMenu/ic_tab_graph.png`),
    TAB_MENU_GRAPH_WHITE: require(`${relativeImagePath}icons/tabMenu/ic_tab_graph_white.png`),

    CHEVRON_LEFT: require(`${relativeImagePath}icons/ic_chevron_left.png`),
    SEARCH: require(`${relativeImagePath}icons/ic_search.png`),
    EYE_ENABLED: require(`${relativeImagePath}icons/ic_eye.png`),
    EYE_DISABLED: require(`${relativeImagePath}icons/ic_eye_disabled.png`),
    LOGO_TEXT: require(`${relativeImagePath}icons/ic_nobi_text_logo.png`)
})

export const Illustrations = {
    BANNER_ONE: require(`${relativeImagePath}illustrations/ills_banner_1.png`)
}

export const Colors = {
    BACKGROUND: "#152A53",
    BLACK: "#000000",
    BLUE: "#1045F6",
    GRAY: "#9D9FA0",
    TRANSPARENT: "#00000000",
    WHITE: "#FFFFFF",
    LABEL: "#9D9FA0",
    BACKGROUND_INPUT: "#11203C",
    PLACEHOLDER: "#EAEAEA",
    WARNING: "#F6BC45",
    SUCCESS: "#05BE90"
}