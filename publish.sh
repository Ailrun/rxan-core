npm run test || exit 0

select version_type in "patch" "minor" "major"; do
    read -p "Creating commit and tag for a $version_type release. Press [Enter].";
    version_with_v=`npm version $version_type | head -n 1`
    version=`echo $version_with_v | cut -b 2-`
    break;
done

npm run build
read -p "Ready to publish tsdux@$version. [Enter] to continue"
npm publish

select branch_type in "stable" "master"; do
    read -p "Ready to push to upstream. [Enter] to continue"
    git push Ailrun $branch_type
    git push Ailrun --tags
    break;
done
