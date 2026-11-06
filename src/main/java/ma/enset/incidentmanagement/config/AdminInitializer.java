package ma.enset.incidentmanagement.config;

import ma.enset.incidentmanagement.entity.User;
import ma.enset.incidentmanagement.enums.Role;
import ma.enset.incidentmanagement.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            createOrUpdateUser(userRepository, passwordEncoder,
                    "Admin A", "admin@test.com", "Admin123!w", Role.ADMIN);
            createOrUpdateUser(userRepository, passwordEncoder,
                    "Technician 4", "technician4@test.com", "Tech123!", Role.TECHNICIAN);
            createOrUpdateUser(userRepository, passwordEncoder,
                    "Employe A", "employee.a@test.com", "Password123!", Role.EMPLOYEE);
            createOrUpdateUser(userRepository, passwordEncoder,
                    "Employe B", "employee.b@test.com", "Password123!", Role.EMPLOYEE);
        };
    }

    private void createOrUpdateUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String fullName,
            String email,
            String password,
            Role role) {

        User user = userRepository.findByEmail(email).orElseGet(User::new);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setEnabled(true);
        userRepository.save(user);
    }
}