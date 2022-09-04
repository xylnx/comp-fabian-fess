<section class="section parallax parallax__contact" id="contact">
  <div class="container contact-content">
    <div class="row">
      <div class="col-lg-12" >

        <div class="row">
          <div class="col-lg-6 ">
            <h1>Contact.</h1>
            <p>Get in touch if you have further questions, like to discuss your latest video project or if you just feel like saying hello.</p>

            <p>You can either send me a message to <a class="email-link" href="mailto:info@fabianfess.de">info@fabianfess.de</a> or use the contact form.</p>
          </div>

          <div class="col-lg-6 mx-auto">

            <?php if(!empty($_SESSION['errors'])): ?>
            <div class="alert alert-danger">
              <ul style="padding-inline-start: 0;"><li style="list-style: none"><?php echo ucfirst(implode('</li><li style="list-style: none;">', $errors))?></li>
              </ul>
            </div>
          <?php endif ?>
          
          <?php if (isset($_SESSION['success']) && $_SESSION['success'] == true): ?>
            <div class="alert alert-success">
              <p>Thank you very much for your message. We will get back to you as soon as possible.</p>
            </div>

          <?php else: ?>
          
          <!-- Inform users to enable js -->
          <noscript>
            <div class="no-script-warning alert alert-info">You disabled Javascript. Please enable Javascript.</div>
          </noscript>
            
            <!-- Inform users on submit success or errors when using ajax-->
            <div id="form__info" class="form__info"></div>

            <form action="contact.php" method="post" id="contact-form" class="section-text">

            <!-- <form id="contact-form" class="section-text"> -->
              <div>
                <label for="name">Name*</label>
                <input type="text" name="name" id="name" placeholder="Please insert your name" autocomplete="off" <?php echo isset($fields['name']) ? ' value="' . e($fields['name']) . '"' : '' ?> class="form-group form-control element-shadow">
                <p id="visible-name"></p>
              </div>
              <div>
                <label for="email">EMail*</label>
                <input required type="email" name="email" id="email" placeholder="Please insert your email address" autocomplete="off" <?php echo isset($fields['email']) ? ' value="' . e($fields['email']) . '"' : '' ?> class="form-group form-control element-shadow name">
                <p id="visible-email"></p>
              </div>
              <div>
                <label for="message">Message*</label>
                <textarea  type="text" name="message" id="message"style="resize:none" cols="80" rows="10" placeholder="Your message" class="message-box form-group form-control element-shadow"><?php echo isset($fields['message']) ? e($fields['message']) : '' ?></textarea>
                <p id="visible-comment"></p>
              </div>
              <button id="submit" type="submit" class="btn btn-outline-secondary" style="font-size: 1.6rem; margin-top: 1rem">Send</button>
            </form>

            <?php endif ?>

            <!-- <form id="contact-form">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="name">Password</label>
                <input type="name" class="form-control" id="name">
              </div>
              <div class="form-group">
                <label for="message" class="h4">Message</label>
                <textarea id="message" class="form-control" rows="5" placeholder="Enter your message"></textarea>
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <div id="msgSubmit" class="h3 d-none">Message Submitted!</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
