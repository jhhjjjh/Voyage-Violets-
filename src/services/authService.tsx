// 模拟API服务
export const authService = {
    // 模拟登录API
    login: async (username: string, password: string) => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟数据库验证
        const validUsers = [
            { username: 'admin', password: 'admin123' }
        ];

        const user = validUsers.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            // 模拟生成JWT Token
            const token = btoa(`${username}:${Date.now()}`);
            return {
                success: true,
                token,
                userInfo: {
                    username,
                    role: username === 'admin' ? 'admin' : 'user'
                }
            };
        }

        return { success: false, message: '用户名或密码错误' };
    }
};