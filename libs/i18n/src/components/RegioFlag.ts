import {h} from "vue";

import {codeToRegionalString} from "../RegionalUtils"

const RegioFlag = (props: { code: string }) => {
  const regionalString = codeToRegionalString(props.code.toLowerCase())
  return h('i', [regionalString])
}

export default RegioFlag
