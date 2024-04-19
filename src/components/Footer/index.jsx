import { BsLinkedin, BsGithub, BsWhatsapp } from "react-icons/bs";
import { CopyrightFooter } from "./style";

const Footer = () => (
  <CopyrightFooter>
    <h4 title="Desenvolvido por Lauro Dutra">
      Copyright &copy; 2024 por<a href="https://www.linkedin.com/in/lauropjdutra" target="_blank"> Lauro Dutra</a>
    </h4>
    <h5>
      Contato:
      <a href="https://www.linkedin.com/in/lauropjdutra" target="_blank" title="LinkedIn">
        <BsLinkedin />
      </a>
      <a href="https://www.github.com/lauropjdutra" target="_blank" title="GitHub">
        <BsGithub />
      </a>
      <a href="https://wa.me/556293449840" target="_blank" title="WhatsApp">
        <BsWhatsapp />
      </a>
    </h5>
  </CopyrightFooter>
)

export default Footer