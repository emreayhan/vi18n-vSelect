<template>
  <div class="basepage_footer">
    <div class="basepage_footer_wrapper">
      <div class="basepage_infos">
        Emre Ayhan
      </div>
      <div class="basepage_copyright">
        {{ $t("message.footer") }}
      </div>
      <div>
        <ul class="basepage_social">
          <li>
            <a href="https://twitter.com/imemreayhan" target="blank">
              <img src="../assets/twitter.svg" alt="twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/imemreayhan/" target="blank">
              <img src="../assets/linkedin.svg" alt="linkedin" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCwCTfMLySqVHSHgm3ofFZUw"
              target="blank"
            >
              <img src="../assets/youtube.svg" alt="youtube" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.basepage_footer {
  background-color: #f9fbf2;
  width: 100%;
  padding: 30px;
  font-size: 18px;
  font-weight: 400;
}

.basepage_footer_wrapper {
  display: flex;
  width: 1090px;
  margin: 0 auto;
  justify-content: space-between;
}
.basepage_copyright span {
  position: relative;
  top: 22px;
  right: 104px;
  font-size: 13px;
  font-weight: 100;
}
.basepage_social {
  display: flex;
  justify-content: space-between;
}
.basepage_social li {
  list-style-type: none;
}
.basepage_social li {
  transform: scale(0.5);
  transition: 0.5s;
}
.basepage_social li:hover {
  transform: scale(0.75) translateY(-15px);
}

@media only screen and (max-width: 600px) {
  .basepage_footer {
    padding: 0;
  }
  .basepage_footer_wrapper {
    display: inline-block;
    width: 400px;
    line-height: 2.5em;
  }

  .basepage_social {
    display: inline-block;
  }
}
</style>
