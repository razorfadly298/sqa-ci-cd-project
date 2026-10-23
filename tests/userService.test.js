const UserService = require('../src/userService');
const UserRepository = require('../src/userRepository');
const EmailService = require('../src/emailService');

jest.mock('../src/userRepository');
jest.mock('../src/emailService');

describe('UserService', () => {
  let userService;
  let mockUserRepo;
  let mockEmailService;

  beforeEach(() => {
    mockUserRepo = new UserRepository();
    mockEmailService = new EmailService();
    userService = new UserService(mockUserRepo, mockEmailService);
  });

  test('registerUser berhasil dengan data valid', async () => {
    const mockUser = { id: 1, name: 'John', email: 'john@test.com' };
    mockUserRepo.save.mockResolvedValue(mockUser);
    mockEmailService.sendWelcomeEmail.mockResolvedValue(true);

    const result = await userService.registerUser('John', 'john@test.com');

    expect(result).toEqual(mockUser);
    expect(mockUserRepo.save).toHaveBeenCalledWith({ name: 'John', email: 'john@test.com' });
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith('john@test.com');
  });

  test('registerUser gagal jika name kosong', async () => {
    await expect(userService.registerUser('', 'test@test.com'))
      .rejects.toThrow('Name cannot be empty');
    expect(mockUserRepo.save).not.toHaveBeenCalled();
  });

  test('registerUser gagal jika name hanya spasi', async () => {
    await expect(userService.registerUser('   ', 'test@test.com'))
      .rejects.toThrow('Name cannot be empty');
  });

  test('registerUser gagal jika name undefined', async () => {
    await expect(userService.registerUser(undefined, 'test@test.com'))
      .rejects.toThrow('Name cannot be empty');
  });

  test('registerUser gagal jika email tidak valid', async () => {
    await expect(userService.registerUser('John', 'invalid'))
      .rejects.toThrow('Invalid email');
  });

  test('registerUser gagal jika email undefined', async () => {
    await expect(userService.registerUser('John', undefined))
      .rejects.toThrow('Invalid email');
  });

  test('getUserById mengembalikan user', async () => {
    const mockUser = { id: 1, name: 'John' };
    mockUserRepo.findById.mockResolvedValue(mockUser);
    expect(await userService.getUserById(1)).toEqual(mockUser);
  });

  test('getUserById error jika tidak ditemukan', async () => {
    mockUserRepo.findById.mockResolvedValue(null);
    await expect(userService.getUserById(99)).rejects.toThrow('User not found');
  });
});
