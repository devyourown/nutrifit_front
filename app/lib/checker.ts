import { existsByUsername } from "./api/user";

export enum NicknameCheckResult {
    NOT_MATCHED,
    
}

export async function checkNickname(nickname: string) {
    const usernameRegex = new RegExp('^[a-zA-Z가-힣0-9]+$');
    if (!usernameRegex.test(nickname)) {
        return '닉네임은 한글, 숫자, 영문만 입력 가능합니다.';
    }
    const isExist = await existsByUsername(nickname);
    if (isExist) {
        return '닉네임이 이미 존재합니다.';
    }
    return '';
}