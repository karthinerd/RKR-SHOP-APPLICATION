package UserRegister.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import UserRegister.model.RegisterEntity;

public interface RegisterRepository extends JpaRepository<RegisterEntity, Long>{

	RegisterEntity findByUserName (String userName);

}
