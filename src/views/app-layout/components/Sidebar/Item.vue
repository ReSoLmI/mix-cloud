<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const { icon, title } = context.props
            const vnodes = []

            if (icon) {
                let className = "icon-"+icon
                vnodes.push(<i class={className}/>)
            }

            if (title) {
                vnodes.push(<span class="side-bar-item-title" slot='title'>{(title)}</span>)
            }
            return vnodes
        }
    }
</script>
