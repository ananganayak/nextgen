export interface OsType {
    Win32NT: string[];
    Linux: string[];
    Network: string[];
    Security: any[];
    Storage: string[];
    Database: string[];
    Application: string[];
}

export interface Data {
    bot_type: string[];
    bot_lang: string[];
    platform_type: string[];
    os_type: OsType;
    bot_script:any;
}

export interface BotRepoMaster {
    result: string;
    data: Data;
}