package com.rkr.shop.security.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rkr.shop.models.User;
import com.rkr.shop.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }
  
  public Long isCustomerPresent(User customer){
      User customer1 = userRepository.getUserByEmailAndUsername(customer.getEmail(),customer.getUsername());
      return customer1!=null ? customer1.getId(): null ;
  }
  
  public User saveCustomer(User customer){
      return userRepository.save(customer);
  }
  
  
}
