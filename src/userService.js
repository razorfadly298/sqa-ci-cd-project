class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async registerUser(name, email) {
    if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }
    const user = await this.userRepository.save({ name, email });
    await this.emailService.sendWelcomeEmail(email);
    return user;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
module.exports = UserService;
